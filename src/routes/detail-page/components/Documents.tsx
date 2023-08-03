import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { useAttachmentState } from 'hook/attachmentHook';
import { saveAs } from 'file-saver';

const Documents = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const { attachments } = useAttachmentState();
  useEffect(() => {
    if (attachments.data) {
      const docs = attachments?.data
        ?.filter(
          (_: any) => !(_.mime_type?.includes('png') || _.mime_type?.includes('jpeg') || _.mime_type?.includes('jpg')),
        )
        .map((file: any) => {
          return {
            key: file.project_attachment_id,
            name: file.file_name,
            url: file.attachment_url,
          };
        });
      setDocs(docs);
    }
  }, [attachments]);

  function downloadAttachment(attachment: any) {
    saveAs(attachment.url, attachment.name);
  }

  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-header">
          <h3 className="detail-problems-component-title-header" id="attachments">
            ATTACHMENTS
          </h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row style={{ marginBottom: '40px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-financials-modal">
          {docs.map((doc: any) => {
            return (
              <a onClick={() => downloadAttachment(doc)}>
                <p style={{ color: '#11093C', marginRight: '10px' }}>
                  <FileOutlined style={{ opacity: '0.35' }} /> {doc.name}
                </p>
              </a>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default Documents;
