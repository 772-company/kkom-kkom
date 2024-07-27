"use client";

import Button from "@/components/button";
import IconButton from "@/components/button/Icon-button";
import LinkButton from "@/components/button/link-button";
import { Dropdown } from "@/components/dropdown/dropdown";
import hamster from "@/public/hamster.jpg";
import { useState } from "react";

export default function Home() {
  const [example, setExample] = useState("드롭다운");
  return (
    <>
      <div className="m-auto mt-14 w-44 bg-blue-200">
        <Dropdown defaultSelected={example}>
          <Dropdown.Button>▽</Dropdown.Button>
          <Dropdown.Body styles="w-36 bg-blue-200">
            <Dropdown.Item>
              <div className="flex gap-2">
                <p>Seo</p>
                <span>Young</span>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>young</Dropdown.Item>
          </Dropdown.Body>
        </Dropdown>
      </div>
      <div className="mx-60">요소 밀리는지 확인!!</div>
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
    </>
  );
}
