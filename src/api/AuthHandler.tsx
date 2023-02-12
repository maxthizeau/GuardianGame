import { FC, ReactNode, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AlertMessage from "../components/AlertMessage"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { fetchUser, profileActions } from "../redux/slices/profileSlice"
import useAuth from "../hook/useAuth"
import MainLayout from "../layouts/MainLayout"

interface IProps {}

const AuthHandler: FC<IProps> = ({}) => {
  const { hash, search } = useLocation()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const { setAccessToken, compareUuidState } = useAuth()
  const navigate = useNavigate()
  const profile = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const setBasicError = () => {
    setError("An error occured. Please retry or contact admin.")
  }

  const verifyKeys = (params: URLSearchParams, keys: string[]): boolean => {
    let success = true
    keys.map((key) => {
      if (!params.get(key)) {
        // console.error(key, "should be in response but is not")
        setBasicError()
        success = false
      }
    })
    return success
  }

  // error response example :
  // ?error=access_denied
  // &error_description=The+user+denied+you+access
  // &state=c3ab8aa609ea11e793ae92361f002671

  // success response example :
  // #access_token=access_token
  // &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
  // &state=if5stt3s1sa
  // &token_type=bearer

  useEffect(() => {
    // If there is a hash => auth completed, need to verify state and update storage accordingly

    if (hash) {
      // substring to remove # at start
      let params = new URLSearchParams(hash.substring(1))

      // Verify that every needed keys are in response, if not, set error and cancel
      const keys = ["access_token", "scope", "state", "token_type"]
      if (!verifyKeys(params, keys)) {
        return
      }

      // If state returned is different than what we expect, error => cancel
      if (!compareUuidState(params.get("state")!)) {
        setError("Error : state mismatch")
        return
      }

      // Everything has been checked : response is valid => set in storage
      setAccessToken(params.get("access_token") ?? undefined)
      dispatch(fetchUser(params.get("access_token")!))
      setSuccess(true)
    }
    // else : auth failed or no param => errorMessage
    else {
      // substring to remove ? at start
      const keys = ["error", "error_description"]
      let params = new URLSearchParams(search.substring(1))
      if (!verifyKeys(params, keys)) {
        setBasicError()
        return
      }

      setError(`[${params.get("error")}] ${params.get("error_description")}`)
      return
    }
  }, [])

  useEffect(() => {
    if (success) {
      const redirect = setTimeout(() => navigate("/"), 3000)
    }
  }, [success])

  return (
    <MainLayout>
      {error && <AlertMessage type="error" message={error} />}
      {success && (
        <AlertMessage
          type="success"
          message={
            <div>
              <p>Authenticated with Twitch successfully. You will be redirected in 3 seconds...</p>
              <p>
                <b>
                  <a href="/">If not, please click on this link.</a>
                </b>
              </p>
            </div>
          }
        />
      )}
      <div>
        <p>Connected as {profile.name}</p>
        <button className="my-4" onClick={() => navigate("/")}>
          Go back to home page
        </button>
      </div>
    </MainLayout>
  )
}

export default AuthHandler
