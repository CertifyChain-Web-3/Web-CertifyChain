import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Rocket } from "lucide-react";

const ButtonDirectAuth = () => {
  const router = useRouter();
  return (
    <Button
      variant="default"
      onClick={() => {
        router.push("/auth/choose-type");
      }}
      className="flex items-center gap-2"
    >
      <Rocket className="ml-2 h-4 w-4" />
      Get Started!
    </Button>
  );
};

export default ButtonDirectAuth;
