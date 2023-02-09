import { FC, ReactNode, useState, useEffect } from "react"
import Spinner from "./Spinner"

interface IProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

const LazyImage: FC<IProps> = (props) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [props.src])

  return (
    <>
      {!loaded && <Spinner />}
      <img
        style={loaded ? props.style : { ...props.style, display: "none" }}
        {...props}
        onLoad={() => {
          setLoaded(true)
        }}
      />
    </>
  )
}

export default LazyImage
