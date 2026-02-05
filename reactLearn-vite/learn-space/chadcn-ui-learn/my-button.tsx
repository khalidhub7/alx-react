import { Button } from "@/components/ui/button";

/* type 1: Simple (Stateless) Components */

const myButton = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <Button>click me</Button>
  </div>
);

export default myButton;
