import {
  Button,
  FluentProvider,
  makeStyles,
  tokens,
  webDarkTheme,
} from "@fluentui/react-components";
import { bundleIcon, SaveFilled, SaveRegular } from "@fluentui/react-icons";
import { classNames } from "../helpers/clsx";

export const IndexPage = () => {
  return (
    <FluentProvider theme={webDarkTheme}>
      <div className="grid min-h-dvh">
        <div className={classNames("my-4 grid grid-rows-[auto_1fr]")}>
          <section className="px-4">heading</section>
          <section className="px-4 pt-4">
            <div>content</div>
            <Content />
          </section>
        </div>
      </div>
    </FluentProvider>
  );
};

const SaveIcon = bundleIcon(SaveFilled, SaveRegular);

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    columnGap: tokens.spacingHorizontalS,
  },
});

const Content = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Button appearance="secondary" icon={<SaveIcon />}>
        Text
      </Button>
      <Button appearance="primary" icon={<SaveIcon />}>
        Text
      </Button>
    </div>
  );
};
