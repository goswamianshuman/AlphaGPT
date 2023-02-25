import {
  BoltIcon,
  ExclamationCircleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-[white]">
      <h1 className="text-5xl font-bold mb-20">AlphaGPT</h1>

      <div className="flex space-x-2 items-start">
        <div>
          <div className="flex flex-col items-center justify-center mb-5 ">
            {/* sun icon */}
            <SunIcon className="h-8 w-8 text-yellow-500" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"Explain something to me"</p>
            <p className="infoText">
              "What is the difference between a dog and a cat?"
            </p>
            <p className="infoText">"what is color of the sun?"</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5 ">
            {/* Bolt icon */}
            <BoltIcon className="h-8 w-8 text-pink-500" />
            <h2>CapaBilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"Change lifestyle model to use"</p>
            <p className="infoText">"our data is safe and secure"</p>
            <p className="infoText">
              "get a loader while gpt is collecting data"
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5 ">
            {/* warning icon */}
            <ExclamationCircleIcon className="h-8 w-8 text-orange-500" />
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              "You may occasionally get a explicit content"
            </p>
            <p className="infoText">
              "contains limited knowledge of worlds after 2021"
            </p>
            <p className="infoText">
              "may generate incorrect information occasionally"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
