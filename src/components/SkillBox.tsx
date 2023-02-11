import { FC, ReactNode } from "react"
import SkillIcon from "../assets/icons/skill-buff.png"

interface IProps {}

const SkillBox: FC<IProps> = ({}) => {
  return (
    <>
      <div className="item-preview-skill">
        <div className="skill-img-container">
          <img src={SkillIcon} />
        </div>

        <div className="skill-infos">
          <h4>Skill : [Buff]</h4>
          <p>
            Increase Strength and Intelligence by 20% <span className="intensify">(+5%)</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default SkillBox
