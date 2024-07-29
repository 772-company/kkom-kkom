"use client";

import Button, { LinkButton } from "@/components/button";
import IconButton from "@/components/button/Icon-button";
import { Dropdown } from "@/components/dropdown/dropdown";
import { useModalStore } from "@/providers/modal-store-provider";
import hamster from "@/public/hamster.jpg";
import { useState } from "react";

export default function Home() {
  const [example, setExample] = useState("드롭다운");
  const { isOpen, openModal, closeModal } = useModalStore((store) => store);

  return (
    <>
      <div className="m-auto mt-14 w-44 bg-blue-200">
        {isOpen && <div>모달 열림</div>}
        <button onClick={openModal}>모달 열기</button>
        <button onClick={closeModal}>모달 닫기</button>
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
      <div>
        <h2>버튼</h2>
        <div>
          <Button btnSize="large" btnStyle="solid" className="w-[280px]">
            solid large
          </Button>
          <Button btnSize="x-small" btnStyle="solid" className="">
            solid x-small
          </Button>
          <Button btnSize="large" btnStyle="outlined" className="w-[280px]">
            outlined large
          </Button>
          <Button btnSize="x-small" btnStyle="outlined" className="">
            outlined x-small
          </Button>
          <Button btnSize="large" btnStyle="danger" className="w-[280px]">
            danger large
          </Button>
          <Button disabled btnSize="x-small" btnStyle="solid" className="">
            disabled
          </Button>
          <Button
            btnSize="large"
            btnStyle="outlined_secondary"
            className="w-[280px]"
          >
            outlined_secondary large
          </Button>
          <Button btnSize="x-small" btnStyle="outlined_secondary" className="">
            outlined_secondary x-small
          </Button>
        </div>
        <div className="flex gap-[10px]">
          <LinkButton
            btnSize="x-small"
            btnStyle="outlined_secondary"
            href="/merong"
            className="w-[280px]"
          >
            outlined_secondary x-small
          </LinkButton>
          <LinkButton
            btnSize="large"
            btnStyle="gradient"
            href="/merong"
            className="w-[280px]"
          >
            gradient
          </LinkButton>
          <IconButton
            src={hamster}
            alt="햄스터"
            onClick={() => console.log("난 햄스터다.")}
            className="h-[100px] w-[100px] object-cover"
          />
        </div>
      </div>
    </>
  );
}
