"use client";

import IconButton from "@/components/Icon-button";
import Button from "@/components/button";
import LinkButton from "@/components/link-button";
import hamster from "@/public/hamster.jpg";

export default function Home() {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex gap-[10px]">
        <Button color="white" type="button" className="h-[30px] w-[100px]">
          text
        </Button>
        <Button
          color="white"
          type="button"
          className="h-[30px] w-[100px]"
          disabled
        >
          disabled
        </Button>
      </div>
      <div className="flex gap-[10px]">
        <Button color="green" type="button" className="h-[30px] w-[100px]">
          green
        </Button>
        <Button
          color="green"
          type="button"
          className="h-[30px] w-[100px]"
          disabled
        >
          disabled
        </Button>
      </div>
      <Button color="red" type="button" className="h-[30px] w-[100px]">
        red
      </Button>
      <Button color="white/gray" type="button" className="h-[30px] w-[100px]">
        white/gray
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
