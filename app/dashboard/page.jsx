import Grid from "../ui/dashboard/grid";
import {items_list} from "../lib/data"

export default function Page() {
  return (
    <Grid items={items_list} />
  );
}
