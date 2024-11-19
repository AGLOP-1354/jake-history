import { getIpAddress } from "@/src/lib/utils/getLogInfo";

import Header from "./_components/Header";

const HeaderWrapper = async () => {
  const ipAddress = getIpAddress();

  return <Header ipAddress={ipAddress} />;
};

export default HeaderWrapper;
