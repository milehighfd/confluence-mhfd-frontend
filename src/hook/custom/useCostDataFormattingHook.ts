import { useMemo } from 'react';
import { MaintenanceTypes } from 'Components/Work/Request/RequestViewUtil';

const useCostDataFormattingHook = (tabKey: any, projectsubtype: any, startYear: any, board_project_id: any, visible:any) => {
  const costFormatList = useMemo(() => {
    const isMaintenance = tabKey === 'Maintenance';
    let showFirst = true;
    let showSecond = true;
    let showThird = true;
    let showFourth = true;
    let showFifth = true;
    if (isMaintenance) {
      showFirst = projectsubtype === MaintenanceTypes[0];
      showSecond = projectsubtype === MaintenanceTypes[1];
      showThird = projectsubtype === MaintenanceTypes[2];
      showFourth = projectsubtype === MaintenanceTypes[3];
      showFifth = projectsubtype === MaintenanceTypes[4];
    }
    const costFormat = [
      { show: showFirst, label: '', key: 'req1', isRequired: isMaintenance && showFirst },
      { show: showSecond, label: '', key: 'req2', isRequired: isMaintenance && showSecond },
      { show: showThird, label: '', key: 'req3', isRequired: isMaintenance && showThird },
      { show: showFourth, label: '', key: 'req4', isRequired: isMaintenance && showFourth },
      { show: showFifth, label: '', key: 'req5', isRequired: isMaintenance && showFifth },
      { show: isMaintenance, label: '', key: 'year1', isRequired: false },
      { show: isMaintenance, label: '', key: 'year2', isRequired: false },
    ]
    for (let i = 0; i < costFormat.length; i++) {
      let label = startYear;
      if (!isMaintenance) {
        label = Number(startYear) + i;
      }
      if (costFormat[i].key === 'year1') {
        label = Number(startYear) + 1;
      } else if (costFormat[i].key === 'year2') {
        label = Number(startYear) + 2;
      }
      costFormat[i].label = label;
    }

    return costFormat;
  }, [projectsubtype, startYear, tabKey, board_project_id, visible]);

  return costFormatList;
}

export default useCostDataFormattingHook;
