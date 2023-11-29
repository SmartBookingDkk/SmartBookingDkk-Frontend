import { Booking } from "@/types/Booking";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

interface BookingCardProps {
    booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {

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
                        <p className="text-md">{booking.employee.business?.name}</p>
                        <p className="text-small text-default-500">Booket ved: {booking.employee.firstName + " " + booking.employee.lastName}</p>
                        <p className="text-small text-default-500">{booking.bookingDate.toDateString()}</p>
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