"use client";

import Button from "@/components/button";
import IconButton from "@/components/icon-button";
import LinkButton from "@/components/link-button";
import hamster from "@/public/hamster.jpg";

export default function Home() {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex gap-[10px]">
        <Button color="solid_white" size="large" type="button">
          SOLID_WHITE
        </Button>
        <Button color="solid_white" size="large" type="button" disabled>
          disabled
        </Button>
      </div>
      <div className="flex gap-[10px]">
        <Button color="solid_green" size="large" type="button">
          SOLID_GREEN
        </Button>
        <Button color="solid_green" size="large" type="button" disabled>
          disabled
        </Button>
      </div>
      <Button color="solid_red" size="large" type="button">
        SOLID_RED
      </Button>
      <Button color="outlined_green" size="large" type="button">
        OUTLINED_GREEN
      </Button>
      <Button color="outlined_gray" size="large" type="button">
        OUTLINED_GRAY
      </Button>
      <LinkButton href="/merong" color="green" className="h-[30px] w-[200px]">
        LinkButton - green
      </LinkButton>
      <LinkButton
        href="/merong"
        color="green/gradient"
        className="h-[30px] w-[300px]"
      >
        LinkButton - green/gradient
      </LinkButton>
      <IconButton
        src={hamster}
        alt="햄스터"
        onClick={() => console.log("난 햄스터다.")}
        className="h-[100px] w-[100px] object-cover"
      />
    </div>
  );
}
