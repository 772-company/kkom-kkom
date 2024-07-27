import { FC, SVGProps, SVGSVGElement } from "react";

declare global {
  module "*.svg" {
    const component: FC<SVGProps<SVGSVGElement>>;

    export default component;
  }
}
