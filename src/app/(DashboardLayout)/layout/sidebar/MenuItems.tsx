import {
  IconCalculator,
  IconListCheck
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Menu",
  },

  {
    id: uniqueId(),
    title: "Quick Count",
    icon: IconCalculator,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Voting",
    icon: IconListCheck,
    href: "/voting",
  },
];

export default Menuitems;
