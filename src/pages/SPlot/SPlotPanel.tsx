import { VizPanelMenu, PanelBuilders, SceneVariableSet, TextBoxVariable, SceneComponentProps, SceneObjectBase, SceneObjectState, QueryVariable } from "@grafana/scenes";
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
    .setVariables(new SceneVariableSet({
      variables: [
        new QueryVariable({
          name: 'h',
          label: 'h',
          query: { query: '*', refId: 'A' },
          datasource: { uid: 'gdev-testdata' },
          definition: '*',
        }),
      ],
    }))
    .setHeaderActions(new SceneSelvaSelect({
      key: 'selva',
      value: '',
    })) 
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



export interface SceneSelvaSelectState extends SceneObjectState {
  // options: Array<SelectableValue<string>>;
  value: string;
}

export class SceneSelvaSelect extends SceneObjectBase<SceneSelvaSelectState> {
  public onChange = (value: string) => {
    // this.parent.state.$variables.state.variables[0].getOptionsForSelect()
    // debugger;
    this.setState({ value });
  };

  public onOpen = () => {
    const options = this.parent.state.$variables.state.variables[0].getOptionsForSelect();
    this.setState({options})
  }

  public static Component = ({ model }: SceneComponentProps<SceneSelvaSelect>) => {
    const { value } = model.useState();
    const options = model.parent.state.$variables.state.variables[0].getOptionsForSelect();
    console.log(options.length)
    return <Select onOpenMenu={model.onOpen} options={options} onChange={()=> console.log('selva')}/>
  };
}