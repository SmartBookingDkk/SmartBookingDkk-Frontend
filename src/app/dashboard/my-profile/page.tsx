import MyProfilePageCustomer from "@/templates/MyProfile/MyProfilePageCustomer"
import MyProfilePageEmployee from "@/templates/MyProfile/MyProfilePageEmployee";
import { NextPage } from "next"


const MyProfile: NextPage = () => {

    //Verify if the client signed in is employee or customer - display either MyProfilePageEmployee or MyProfilePageCustomer

    return <MyProfilePageEmployee />
}

export default MyProfile;