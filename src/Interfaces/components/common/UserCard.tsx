import { Card } from "antd";
import { FC } from "react";

const { Meta } = Card;

interface UserCardProps {
  id: number;
  fullName: string;
  email: string;
  image: string;
}

const UserCard: FC<UserCardProps> = ({ id, fullName, email, image }) => (
  <div className="flex justify-center items-center min-h-screen">
    <Card
      key={id}
      style={{ width: 300 }}
      className="outline outline-gray-200 outline-1 hover:-translate-y-2 duration-700 transition"
      cover={<img style={{ height: 200 }} alt="example" src={image} />}
      hoverable
    >
      <Meta style={{ textAlign: "justify", height: "120px" }} title={fullName} description={email} />
    </Card>
  </div>
);

export default UserCard;
