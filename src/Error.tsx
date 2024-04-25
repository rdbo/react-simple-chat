import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function Error() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex mt-8 justify-center">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl">An error has happened</h1>
        <img className="w-48" src="/assets/images/crying_emoji.gif" />
        <Button className="text-xl" onClick={goToHomePage}>
          Home Page
        </Button>
      </div>
    </div>
  );
}
