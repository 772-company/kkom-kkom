"use client";

import { Dropdown } from "@/components/dropdown/dropdown";

export default function DropdownTestPage() {
  return (
    <div className="m-auto mt-14 w-44 bg-blue-200">
      <Dropdown>
        <Dropdown.Button>▽</Dropdown.Button>
        <Dropdown.Body>
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
  );
}
