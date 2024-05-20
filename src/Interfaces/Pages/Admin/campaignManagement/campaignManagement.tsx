import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Input, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Campaign } from "../../../../core/entities/Campaign";
import { Candidate } from "../../../../core/entities/Candidates";
import {
  fetchCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  fetchCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from "../../../../core/useCases/campaigns/campaignUseCases";
import CustomButton from "../../../components/common/CustomButton";

const { Meta } = Card;

const CampaignManagementPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [participants, setParticipants] = useState<Candidate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [campaignView, setCampaignView] = useState(false);
  const [edit, setEdit] = useState<Candidate | null>(null);
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null);
  const formRef = useRef<any>();

  useEffect(() => {
    const loadCampaigns = async () => {
      const data = await fetchCampaigns();
      setCampaigns(data);
    };

    loadCampaigns();
  }, []);

  const handleAddCampaign = async (values: Campaign) => {
    await addCampaign(values);
    setIsModalOpen(false);
    const updatedCampaigns = await fetchCampaigns();
    setCampaigns(updatedCampaigns);
  };

  const handleUpdateCampaign = async (values: Campaign) => {
    await updateCampaign(values);
    setCampaignView(false);
    const updatedCampaigns = await fetchCampaigns();
    setCampaigns(updatedCampaigns);
  };

  const handleDeleteCampaign = async (campaignID: string) => {
    await deleteCampaign(campaignID);
    const updatedCampaigns = await fetchCampaigns();
    setCampaigns(updatedCampaigns);
  };

  const handleFetchCandidates = async (campaignID: string) => {
    const data = await fetchCandidates(campaignID);
    setParticipants(data);
  };

  const handleAddCandidate = async (values: Candidate) => {
    await addCandidate({
      ...values,
      campaignID: selectedCampaign!.id,
      votes: 0,
    });
    setIsModalOpen(false);
    await handleFetchCandidates(selectedCampaign!.id);
  };

  const handleUpdateCandidate = async (values: Candidate) => {
    await updateCandidate(values);
    setViewModal(false);
    await handleFetchCandidates(selectedCampaign!.id);
  };

  const handleDeleteCandidate = async (candidateID: string) => {
    await deleteCandidate(candidateID);
    await handleFetchCandidates(selectedCampaign!.id);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Campaign Management</h1>
        <CustomButton
          type="primary"
          onClick={() => setIsModalOpen(true)}
          text="Add Campaign"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              style={{ width: 300 }}
              className="outline outline-gray-100 outline-1"
              hoverable
              cover={
                <img
                  style={{ height: 200 }}
                  alt="example"
                  src={campaign.image}
                />
              }
              actions={[
                <EditOutlined
                  onClick={() => {
                    setEditCampaign(campaign);
                    setCampaignView(true);
                  }}
                  key="edit"
                  style={{ color: "skyblue" }}
                />,
                <DeleteOutlined
                  onClick={() => handleDeleteCampaign(campaign.id)}
                  key="delete"
                  style={{ color: "#c13584" }}
                />,
              ]}
            >
              <Meta
                style={{ textAlign: "justify", height: "120px" }}
                title={campaign.name}
                description={campaign.description}
              />
              <Button
                type="link"
                onClick={() => {
                  setSelectedCampaign(campaign);
                  handleFetchCandidates(campaign.id);
                }}
              >
                View Participants
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        open={selectedCampaign !== null}
        title="Participants"
        footer={null}
        onCancel={() => setSelectedCampaign(null)}
      >
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Participant
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {participants.map((candidate) => (
            <Card
              key={candidate.id}
              style={{ width: 300 }}
              className="outline outline-gray-100 outline-1"
              hoverable
              cover={
                <img
                  style={{ height: 200 }}
                  alt="example"
                  src={candidate.candidateSymbol}
                />
              }
              actions={[
                <EditOutlined
                  onClick={() => {
                    setEdit(candidate);
                    setViewModal(true);
                  }}
                  key="edit"
                  style={{ color: "skyblue" }}
                />,
                <DeleteOutlined
                  onClick={() => handleDeleteCandidate(candidate.id)}
                  key="delete"
                  style={{ color: "#c13584" }}
                />,
              ]}
            >
              <Meta
                style={{ textAlign: "justify", height: "120px" }}
                title={candidate.candidateName}
                description={candidate.candidateSymbol}
              />
            </Card>
          ))}
        </div>
      </Modal>

      <Modal
        open={isModalOpen}
        title="Add Campaign"
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          ref={formRef}
          name="candidate"
          onFinish={handleAddCandidate}
          autoComplete="off"
        >
          <Form.Item
            label="Candidate Name"
            name="candidateName"
            rules={[
              { required: true, message: "Please input candidate name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Candidate Symbol"
            name="candidateSymbol"
            rules={[
              { required: true, message: "Please input candidate symbol!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primaryColor-900"
            >
              Add Candidate
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={viewModal}
        title="Edit Candidate"
        footer={null}
        onCancel={() => setViewModal(false)}
      >
        <Form
          ref={formRef}
          name="candidate"
          initialValues={edit || {}}
          onFinish={handleUpdateCandidate}
          autoComplete="off"
        >
          <Form.Item
            label="Candidate Name"
            name="candidateName"
            rules={[
              { required: true, message: "Please input candidate name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Candidate Symbol"
            name="candidateSymbol"
            rules={[
              { required: true, message: "Please input candidate symbol!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primaryColor-900"
            >
              Update Candidate
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={campaignView}
        title="Edit Campaign"
        footer={null}
        onCancel={() => setCampaignView(false)}
      >
        <Form
          ref={formRef}
          name="campaign"
          initialValues={editCampaign || {}}
          onFinish={handleUpdateCampaign}
          autoComplete="off"
        >
          <Form.Item
            label="Campaign Name"
            name="name"
            rules={[{ required: true, message: "Please input campaign name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input campaign description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please input image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primaryColor-900"
            >
              Update Campaign
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CampaignManagementPage;
