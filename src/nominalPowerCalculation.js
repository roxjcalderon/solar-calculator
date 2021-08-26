export const calculateNominalPower = (area) => {
  // https://www.mitsubishielectricsolar.com/images/uploads/documents/specs/MLU_spec_sheet_250W_255W.pdf
  // The assumption made here is that solar panels are aligned with no space in between for the entire area,
  // rounded down to eliminate any partial panels. Then I am calculating the total wP for all solar panels
  // using nominal power

  const solar_panel_size_in_m2 = 1.625 * 1.019
  const solar_panel_wp = 255

  const panels = Math.floor(area / solar_panel_size_in_m2)

  return (
    <p> Nominal Power for Area Selected: {(solar_panel_wp * panels)/1000} kW</p>
  )
}
