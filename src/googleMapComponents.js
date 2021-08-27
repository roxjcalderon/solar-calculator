export const drawingTool = (map, googleMaps) => {
  //Resources:
  // https://github.com/google-map-react/google-map-react/issues/102
  const drawingManager = new googleMaps.drawing.DrawingManager({
    drawingMode: googleMaps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: googleMaps.ControlPosition.TOP_CENTER,
      drawingModes: [
        googleMaps.drawing.OverlayType.POLYGON,
      ],
    },
  });
  drawingManager.setMap(map);
  return drawingManager;
};
