import { Text, Accordion, AccordionBody, AccordionHeader, AccordionList, Button, Card, Flex, Icon, Textarea } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import PluginControls from './plugin';

export default function ListHospots() {
    const [values, setValues] = useState({});
    const [hotspots, setHotspots] = useState<any>([]);
    const [toggleClick, setToggleClick] = useState<boolean>(null)

    useEffect(() => {
        const cleanup = PluginControls().getPositionClick((modelViewer, cameraTarget, checkPosition) => {
            const count = PluginControls().getCountHotspot().length;
            if (toggleClick) {
                PluginControls().addHotspot(cameraTarget, count, () => {
                    setToggleClick(false);
                });
                setHotspots(PluginControls().getCountHotspot());
            } 
        });
        return cleanup;
    }, [toggleClick])


    return (
        <AccordionList>
            <Accordion>
                <AccordionHeader>Hotspots</AccordionHeader>
                <AccordionBody className='!gap-5 flex flex-col'>
                    {!hotspots || !hotspots.slotsArray ? (
                        <></>
                    ) : (
                        hotspots.slotsArray.map((slot, index) => (
                            <Card key={index}>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const idSlot = slot
                                        PluginControls().deleteHotspot(idSlot)
                                        setHotspots(PluginControls().getCountHotspot());
                                    }}
                                >
                                    <div className="flex flex-col gap-7">
                                        <Flex alignItems={"center"} >
                                            <label htmlFor="description" className="text-sm text-slate-500 !mb-0">
                                                Label:
                                            </label>
                                            <Button className="" variant="light" type="submit">
                                                <Icon icon={TrashIcon} color='rose' tooltip='Xóa điểm'></Icon>
                                            </Button>
                                        </Flex>
                                        <Textarea
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const updatedValues = { ...values };
                                                updatedValues[slot] = e.target.value;
                                                setValues({ ...updatedValues });
                                                PluginControls().updateContentHotspot(slot, updatedValues[slot])
                                            }}
                                            id="description"
                                            placeholder="Nội dung..."
                                            value={values[slot]}
                                        />
                                    </div>
                                </form>
                            </Card>
                        ))
                    )}

                    <Button className="" variant="primary" icon={PlusCircleIcon}
                        onClick={(e) => {
                            e.preventDefault();
                            setToggleClick(!toggleClick);
                        }}
                    >
                        Thêm chú thích
                    </Button>
                </AccordionBody>
            </Accordion>
        </AccordionList>
    )
}
