import { behaviors, EmbeddedScene, SceneGridLayout } from "@grafana/scenes";
import { getLayoutChildren } from "../SPlotPanels";

function getVariableChangeBehavior(variableName: string) {
    return new behaviors.ActWhenVariableChanged({
      variableName,
      onChange: (variable) => {
        const scene: EmbeddedScene = variable.parent?.parent;
        scene.setState({
          body: new SceneGridLayout({
            isDraggable: true,
            children: getLayoutChildren(Number(scene.state.$variables?.getByName('npanel')?.state.value),Number(scene.state.$variables?.getByName('ncol')?.state.value))
          }),
        })
      },
    });
  }