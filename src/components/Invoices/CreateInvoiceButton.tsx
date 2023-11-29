import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const CreateInvoiceButton = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>

            <div className='flex justify-end mx-8 sm:mt-2  my-4'>
                <button onClick={onOpen} className='btn-primary'>Opret Faktura +</button>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <Select
                                    isRequired
                                    label="Vælg Kunde"
                                    placeholder="Vælg Kunde"
                                    defaultSelectedKeys={["James Smith"]}
                                    className="max-w-xs"
                                >
                                        <SelectItem>James Smith</SelectItem>
                                </Select>
                                <Input
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                />
                                <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        classNames={{
                                            label: "text-small",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link color="primary" href="#" size="sm">
                                        Forgot password?
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={onClose}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </>
    )
}

export default CreateInvoiceButton