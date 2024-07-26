"use client";

import { Dropdown } from "@/components/dropdown/dropdown";
import { useState } from "react";

export default function DropdownTestPage() {
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
    </>
  );
}
