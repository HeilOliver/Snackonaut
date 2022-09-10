import { Button, FormControl, Input, Popover } from "native-base";
import React, { useContext, useState } from "react";
import { StatsContext } from "../providers/StatsProvider";

const EditName = () => {
    const { stats, setName } = useContext(StatsContext);
    const [editOpen, setEditOpen] = useState(false);
    const [editName, setEditName] = useState(stats.name);

    return (
        <Popover
            placement="bottom right"
            trigger={(triggerProps) => {
                return (
                    <Button
                        {...triggerProps}
                        onPress={() => {
                            setEditName(stats.name);
                            setEditOpen(!editOpen);
                        }}
                        bordered
                        variant="ghost"
                        rounded="full"
                    >
                        🖊
                    </Button>
                );
            }}
            isOpen={editOpen}
            onClose={() => setEditOpen(!editOpen)}
        >
            <Popover.Content w="80">
                <Popover.Arrow />
                <Popover.Body>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontSize: "xs",
                                fontWeight: "medium",
                            }}
                        >
                            Name
                        </FormControl.Label>
                        <Input
                            rounded="sm"
                            fontSize="xs"
                            value={editName}
                            onChangeText={(text) => setEditName(text)}
                        />
                    </FormControl>
                </Popover.Body>
                <Popover.Footer justifyContent="flex-end">
                    <Button.Group space={2}>
                        <Button
                            variant="ghost"
                            onPress={() => setEditOpen(false)}
                        >
                            ❌
                        </Button>
                        <Button
                            variant="ghost"
                            onPress={() => {
                                setName(editName);
                                setEditOpen(false);
                            }}
                        >
                            💾
                        </Button>
                    </Button.Group>
                </Popover.Footer>
            </Popover.Content>
        </Popover>
    );
};

export default EditName;
