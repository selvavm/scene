import { SceneTimeRange, VariableValueSelectors, SceneControlsSpacer, SceneTimePicker, SceneRefreshPicker, QueryRunnerState, SceneQueryRunner } from "@grafana/scenes";
import { DATASOURCE_REF } from "../../constants";

export function getEmbeddedSceneDefaults() {
    return {
      $timeRange: new SceneTimeRange(),
      controls: [
        new VariableValueSelectors({}),
        new SceneControlsSpacer(),
        new SceneTimePicker({}),
        new SceneRefreshPicker({}),
      ],
    };
  }

  export function getQueryRunnerWithRandomWalkQuery(
    overrides?: Partial<any>,
    queryRunnerOverrides?: Partial<QueryRunnerState>
  ) {
    return new SceneQueryRunner({
      queries: [
        {
          refId: 'A',
          datasource: DATASOURCE_REF,
          scenarioId: 'random_walk',
          ...overrides,
        },
      ],
      ...queryRunnerOverrides,
    });
  }