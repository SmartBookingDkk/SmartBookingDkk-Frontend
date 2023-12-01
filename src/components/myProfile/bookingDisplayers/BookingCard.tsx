import { Booking } from "@/types/Booking";
import { Business } from "@/types/Business";
import { Customer } from "@/types/Customer";
import { Employee } from "@/types/Employee";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

interface BookingCardProps {
    booking: Booking;
    user: Employee | Customer;
}

const BookingCard = ({ booking, user }: BookingCardProps) => {


    return (
        <>
            <Card className="max-w-[400px] m-8">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">
                            {(user.business && Array.isArray(user.business))
                                ? (user.business.find(business => {
                                    console.log(business)
                                    return business.id === booking.category.business.id
                                })?.name ?? 'No Business Name')
                                : ((user as Employee).business?.name ?? 'No Business Name')}
                        </p>
                        <p className="text-small text-default-500">Booket ved: {user.firstName + " " + user.lastName}</p>
                        <p className="text-small text-default-500">{booking.bookingDate}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <h3 className="font-semibold text-slate-750">{`${booking.category.name}`}</h3>
                    <p>{`Tidspunktet for din booking: ${booking.bookingStartTime} - ${booking.bookingEndTime}`}</p>
                    <p>{`Samlet pris: ${booking.invoice.price}.- DKK`}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Link
                        isExternal
                        showAnchorIcon
                        href="https://github.com/nextui-org/nextui"
                    >
                        {`Se din ${booking.invoice.isPaid ? "betalte" : "endnu ikke betalte"} regning her.`}
                    </Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default BookingCard;