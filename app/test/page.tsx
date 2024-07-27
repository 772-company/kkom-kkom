"use client";

import { Dropdown } from "@/components/dropdown/dropdown";
import { showToast } from "@/lib/show-toast";
import { useState } from "react";

export default function DropdownTestPage() {
  const [example, setExample] = useState("드롭다운");
  return (
    <>
      <div className="m-auto mt-14 w-44 bg-blue-200">
        <button onClick={() => showToast("warning", <p>토스트</p>)}>
          warning toast 열기
        </button>
        <button onClick={() => showToast("default", <p>토스트</p>)}>
          default toast 열기
        </button>
        <button onClick={() => showToast("info", <p>토스트</p>)}>
          info toast 열기
        </button>
        <button onClick={() => showToast("success", <p>토스트</p>)}>
          success toast 열기
        </button>
        <button onClick={() => showToast("error", <p>토스트</p>)}>
          error toast 열기
        </button>
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
