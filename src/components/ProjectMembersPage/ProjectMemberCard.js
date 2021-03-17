import React, { Component } from 'react';
import { Box, SimpleGrid, Stack, Icon, Heading, Grid, Avatar, Text, Divider, Tag, Button } from '@chakra-ui/core';

class ProjectMemberCard extends Component {
    render() {
        return (
            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                <Avatar size="xl"  ml="23%"/>
                    <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                        <Stack>
                            <Text mt="30%" textAlign="center">Bilal Zubairi</Text>
                                <Heading textAlign="center" mt="auto" as="h6" size="s">
                                    Project Manager
                                </Heading>
                        </Stack>
                    </Box>
            </Stack>        
        )
    }
}

export default ProjectMemberCard;