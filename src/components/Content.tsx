import { Box, Tab, Tabs, styled } from "@mui/material";
import { History } from "history";
import React, { HTMLAttributes } from "react";

import { Songs } from "./Songs";

interface ContentPropTypes extends HTMLAttributes<HTMLDivElement> {
  page?: string;
  history: History;
}

interface TabPanelProps {
  value: Page;
  page: Page;
  children: React.ReactNode;
}

enum Page {
  songs,
  playlists,
  contributors,
  wallet,
  metrics,
}

const StyledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.tabs.fontFamily,
  fontWeight: theme.typography.tabs.fontWeight,
  textTransform: "capitalize",
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, page, ...other } = props;
  return <div { ...other }>{ value === page && <Box p={ 3 }>{ children }</Box> }</div>;
}

export const Content = (props: ContentPropTypes) => {
  const { page: pageName, history } = props;

  const initialPage = (pageName && Page[pageName as keyof typeof Page]) || Page.songs;

  const [value, setValue] = React.useState(initialPage);

  const handleChange = (_event: React.SyntheticEvent, newValue: Page) => {
    history.push(`/home/${Page[newValue]}`);
    setValue(newValue);
  };

  return (
    <Box sx={ { justifyContent: "center", marginLeft: "auto", marginRight: "auto" } }>
      <Tabs
        centered
        value={ value }
        onChange={ handleChange }
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <StyledTab label="Songs" />
        <StyledTab label="Playlists" />
        <StyledTab label="Contributors" />
        <StyledTab label="Wallet" />
        <StyledTab label="Metrics" />
      </Tabs>

      <Box justifyContent="center">
        <TabPanel value={ value } page={ Page.songs }>
          <Box sx={ { marginLeft: "auto", marginRight: "auto", width: "1060px" } }>
            <Songs history={ history } />
          </Box>
        </TabPanel>
        <TabPanel value={ value } page={ Page.playlists }>
          Playlists
        </TabPanel>
        <TabPanel value={ value } page={ Page.contributors }>
          Contributors
        </TabPanel>
        <TabPanel value={ value } page={ Page.wallet }>
          Wallet
        </TabPanel>
        <TabPanel value={ value } page={ Page.metrics }>
          Metrics
        </TabPanel>
      </Box>
    </Box>
  );
};
