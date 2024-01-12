import { SceneGridItem } from "@grafana/scenes";
import { getPanelWithMenu } from "./SPlotPanel";

export function getLayoutChildren(count: number, ncol: number) {
    return Array.from(Array(count), (v, index) => {
      const x = 0 + Math.floor(25 / ncol) * (index % ncol);
      const width = Math.floor(25 / ncol);
      return new SceneGridItem({
        x: x,
        y: 0,
        width: width,
        height: 10,
        isResizable: true,
        isDraggable: true,
        body: getPanelWithMenu(),
      })
    }
    );
  }