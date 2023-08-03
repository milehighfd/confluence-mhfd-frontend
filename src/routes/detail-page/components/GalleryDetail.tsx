import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useAttachmentState } from 'hook/attachmentHook';

const GalleryDetail = () => {
  const { attachments } = useAttachmentState();
  const [listAttach, setListAttachment] = useState([]);

  useEffect(() => {
    const listAttachAux = attachments?.data?.filter((element: any) => {
      return (
        element.mime_type === 'image/png' ||
        element.mime_type === 'image/jpg' ||
        element.mime_type === 'image/jpeg' ||
        element.mime_type === 'image/gif'
      );
    });
    let indexCover = 0;
    listAttachAux?.map((element: any, index: number) => {
      if (element.is_cover) {
        indexCover = index;
      }
      return index;
    });
    if (listAttachAux && listAttachAux.length > 0) {
      const temp = listAttachAux[indexCover];
      listAttachAux[indexCover] = listAttachAux[0];
      listAttachAux[0] = temp;
    }
    setListAttachment(listAttachAux);
  }, [attachments]);
  return (
    <>
      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 24 }}
          className="detail-problems-component-header"
        >
          <h3 className="detail-problems-component-title-header" id="gallery">
            GALLERY
          </h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row style={{ marginBottom: '0px' }}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 24 }}
          className="table-detail-financials-modal"
        >
          <div className="gallery-grid">
            {listAttach && listAttach.length > 0 ? (
              listAttach?.map((element: any, index: number) => {
                if (
                  element.mime_type === 'image/png' ||
                  element.mime_type === 'image/jpg' ||
                  element.mime_type === 'image/jpeg' ||
                  element.mime_type === 'image/gif'
                ) {
                  return (
                    <>
                      <div>
                        <img src={element.attachment_url} alt="" height="100%" />
                      </div>
                    </>
                  );
                }
              })
            ) : (
              <>
                <div />
                <div />
                <div />
                <div />
                <div />
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default GalleryDetail;
