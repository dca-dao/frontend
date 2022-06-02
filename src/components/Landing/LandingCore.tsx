import Chart from "../../Chart.svg"
import DaiLogo from "../../dai.png"
import "./style.css"

export const LandingCore = () => {
    return (
        <div className="container">
            <div className="item">
                <img
                    src={Chart}
                    alt="Stonks"
                    width="650"
                    height="650"
                />
            </div>
            <div className="item">
                <h1>Investing in crypto has never been so easy !</h1>
                <p>You can start investing in cryptocurrencies the smart way using our dollar cost averaging solution based on stablecoins and combined with automatic staking !</p>
                <img className="dai"
                    src={DaiLogo}
                    alt="Stablekwon"
                    width="200"
                    height="200"
                />
            </div>

        </div>

    );
};
