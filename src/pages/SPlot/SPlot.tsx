import React from 'react';
import { getScene } from './SPlotScene';
import { useSceneApp } from '@grafana/scenes';

export const SPlotPluginPage = () => {
  const scene = useSceneApp(getScene);

  return <scene.Component model={scene} />;
};
