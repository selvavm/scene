import { VizPanelMenu, PanelBuilders } from "@grafana/scenes";
import { getQueryRunnerWithRandomWalkQuery } from "./SPlotUtils";
import { Select } from "@grafana/ui";
import React from "react";

export function getPanelWithMenu() {
  const readingFromPanelMenu = new VizPanelMenu({});
  const data = getQueryRunnerWithRandomWalkQuery();
  const panelWithMenu = PanelBuilders
    .timeseries()
    .setTitle('Draggable and resizable')
    .setData(data)
    .setMenu(readingFromPanelMenu)
    // .setHeaderActions(
    //   <Select options={[{ label: 'Option 1', value: '1' }]} onChange={() => { }} value="1" />
    // )
    .build();
  readingFromPanelMenu.addActivationHandler(() => {
    const plugin = panelWithMenu.getPlugin();

    readingFromPanelMenu.setItems([
      {
        text: `FFT`,
        onClick: () => {
          alert(plugin?.meta.id);
        },
      },
      {
        text: `Change ${plugin?.meta.id} panel title`,
        onClick: () => {
          panelWithMenu.setState({ title: `Updated title ${Math.floor(Math.random() * 100) + 1}` });
        },
      },
      {
        text: `Change number of  series`,
        onClick: () => {
          data.setState({
            queries: [
              {
                ...data.state.queries[0],
                seriesCount: Math.floor(Math.random() * 10) + 1,
              },
            ],
          });
          data.runQueries();
        },
      },
    ]);
  });
  return panelWithMenu;
}