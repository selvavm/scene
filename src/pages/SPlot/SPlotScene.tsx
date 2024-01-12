import { EmbeddedScene, SceneApp, SceneAppPage, SceneGridLayout, SceneVariableSet, TextBoxVariable, behaviors } from '@grafana/scenes';
import { DashboardCursorSync } from '@grafana/schema';
import { getLayoutChildren } from './SPlotPanels';
import { getEmbeddedSceneDefaults } from './SPlotUtils';
import { prefixRoute } from '../../utils/utils.routing';
import { ROUTES } from '../../constants';

export function getScene() {
  return new SceneApp({
    pages: [new SceneAppPage({
      title: 'SPlot',
      // Important: Mind the page route is ambiguous for the tabs to work properly
      url: prefixRoute(`${ROUTES.SPlot}`),
      subTitle: 'SPlot by Selva',
      getScene: () => {
        return new EmbeddedScene({
          ...getEmbeddedSceneDefaults(),
          // $data: getQueryRunnerWithRandomWalkQuery(),
          $behaviors: [getVariableChangeBehavior('npanel'), getVariableChangeBehavior('ncol'), new behaviors.CursorSync({ key: 'sync1', sync: DashboardCursorSync.Tooltip })],
          $variables: new SceneVariableSet({
            variables: [
              new TextBoxVariable({
                name: 'ncol',
                value: '1',

              }),
              new TextBoxVariable({
                name: 'npanel',
                value: '1',
              }),
            ],
          }),
          body: new SceneGridLayout({
            isDraggable: true,
            children: getLayoutChildren(1, 1)
          }),
        });
      },
    })]
  })
}

function getVariableChangeBehavior(variableName: string) {
  debugger;
  return new behaviors.ActWhenVariableChanged({
    variableName,
    onChange: (variable) => {
      
      const scene: EmbeddedScene = variable.parent?.parent;
      scene.setState({
        body: new SceneGridLayout({
          isDraggable: true,
          children: getLayoutChildren(Number(scene.state.$variables?.getByName('npanel')?.state.value), Number(scene.state.$variables?.getByName('ncol')?.state.value))
        }),
      })
    },
  });
}
