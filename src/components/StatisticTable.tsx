import { FC, ReactNode } from "react"
import IntelligenceIcon from "../assets/icons/intelligence.png"
import StrengthIcon from "../assets/icons/strength.png"
import VitalityIcon from "../assets/icons/vitality.png"
import { Statistic } from "../data/types"

interface IProps {
  statistics: Statistic
}

const StatisticTable: FC<IProps> = ({ statistics }) => {
  return (
    <table className="stats-table">
      <tbody>
        <tr>
          <td className="icon">
            <img src={VitalityIcon} />
          </td>
          <td className="stat-name">Vitality</td>
          <td className="stat-value">{statistics.vitality}</td>
        </tr>
        <tr>
          <td className="icon">
            <img src={StrengthIcon} />
          </td>
          <td className="stat-name">Strength</td>
          <td className="stat-value">{statistics.strength}</td>
        </tr>
        <tr>
          <td className="icon">
            <img src={IntelligenceIcon} />
          </td>
          <td className="stat-name">Intelligence</td>
          <td className="stat-value">{statistics.intelligence}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StatisticTable
