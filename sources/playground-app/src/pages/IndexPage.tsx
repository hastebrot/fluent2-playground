import { classNames } from "../helpers/clsx";

export const IndexPage = () => {
  return (
    <div className="grid min-h-dvh">
      <div className={classNames("m-4 grid grid-rows-[auto_1fr]")}>
        <section className="px-4">heading</section>
        <section className="px-4 pt-4">content</section>
      </div>
    </div>
  );
};
