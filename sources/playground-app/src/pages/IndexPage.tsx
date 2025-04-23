import {
  Button,
  Card,
  FluentProvider,
  Input,
  makeStyles,
  tokens,
  webDarkTheme,
} from "@fluentui/react-components";
import { bundleIcon, SaveFilled, SaveRegular } from "@fluentui/react-icons";
import { NavDrawer, NavDrawerBody, NavDrawerHeader, NavItem } from "@fluentui/react-nav-preview";
import { classNames } from "../helpers/clsx";
import { createStore } from "../lib/store";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
  },
  content: {
    display: "flex",
    columnGap: tokens.spacingHorizontalS,
  },
});

const SaveIcon = bundleIcon(SaveFilled, SaveRegular);

const store = createStore();
await store.set(["foo", "bar"], "baz");
await store.get(["foo", "bar"]).then((value) => console.log(value));
await store.list(["foo"]).then((value) => console.log(value));

export const IndexPage = () => {
  const styles = useStyles();

  return (
    <FluentProvider theme={webDarkTheme}>
      <div className={classNames("grid min-h-dvh", styles.root)}>
        <div className="my-4 grid grid-rows-[auto_1fr]">
          <NavDrawer defaultSelectedValue="1" open={true}>
            <NavDrawerHeader></NavDrawerHeader>
            <NavDrawerBody>
              <NavItem value="1">Dashboard</NavItem>
            </NavDrawerBody>
          </NavDrawer>
          <section className="px-4">heading</section>
          <section className="px-4 pt-4 grid">
            <Card className={styles.card}>
              <div>content</div>
              <div className={styles.content}>
                <Button appearance="secondary" icon={<SaveIcon />}>
                  Text
                </Button>
                <Button appearance="primary" icon={<SaveIcon />}>
                  Text
                </Button>
                <Input defaultValue="Text" />
              </div>
            </Card>
          </section>
        </div>
      </div>
    </FluentProvider>
  );
};
