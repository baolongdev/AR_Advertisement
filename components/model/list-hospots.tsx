import { Text, Accordion, AccordionBody, AccordionHeader, AccordionList, Button, Card, Flex, Icon, Textarea } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import PluginControls from './plugin';

export default function ListHospots() {
    const [values, setValues] = useState({});
    const [hotspots, setHotspots] = useState<any>([]);
    const [toggleClick, setToggleClick] = useState<boolean>(false)
    useEffect(() => {
        const clickHandler = (modelViewer, cameraTarget, checkPosition) => {
            const count = PluginControls().getCountHotspot().length;
            console.log(count);

            if (!checkPosition) {
                if (toggleClick === true) {
                    console.log("ádfasdf");
                    
                    PluginControls().addHotspot(cameraTarget, count, (modelViewer) => {
                        modelViewer.removeEventListener('click', clickHandler);
                        setToggleClick(false)
                    });
                }
            }
        };
        if (toggleClick) {
            PluginControls().getPositionClick(clickHandler);
        }
        setHotspots(PluginControls().getCountHotspot());
        console.log(toggleClick);

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
                                        console.log(hotspots);
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
                            setToggleClick(!toggleClick)
                        }}
                    >
                        Thêm chú thích
                    </Button>
                </AccordionBody>
            </Accordion>
        </AccordionList>
    )
}
