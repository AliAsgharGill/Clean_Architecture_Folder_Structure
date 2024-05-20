import { Card } from "antd";
import { FC } from "react";

const { Meta } = Card;

interface UserCardProps {
  id: number;
  fullName: string;
  email: string;
  image: string;
  style?: string;
  className: string;
  hoverable?: boolean;
}

const UserCard: FC<UserCardProps> = ({
  id,
  fullName,
  email,
  image,
  style,
  className,
  hoverable,
}) => (
  <div className="flex justify-center items-center min-h-screen">
    <Card
      key={id}
      style={style}
      className={`outline outline-gray-200 outline-1 hover:-translate-y-2 duration-700 transition ${className} `}
      cover={<img style={{ height: 200 }} alt="example" src={image} />}
      hoverable={hoverable}
    >
      <Meta
        style={{ textAlign: "justify", height: "120px" }}
        title={fullName}
        description={email}
      />
    </Card>
  </div>
);

export default UserCard;
