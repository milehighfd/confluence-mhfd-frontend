import React from "react"
import ListHistory from "routes/detail-page/components/ListHistory";

export const ActivitiCreateProject = ({projectId, data}: {projectId: any, data: any}) => {
  return (
    <div className="body-project">
      <ListHistory projectId={projectId} />
    </div>
  )
}
