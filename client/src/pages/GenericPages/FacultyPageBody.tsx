import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import styles from "../../styles/GenericPages/FacultyPageBody.module.scss";

export default function FacultyPageBody() {
  return (
    <div className={styles.FacultyPageBody}>
      <Center>
        <Box bg="#fff" borderRadius={10} className={styles.TableWrapper}>
          <FacultyTable />
        </Box>
      </Center>
    </div>
  );
}

function FacultyTable() {
  return (
    <TableContainer>
      <Table variant="simple" size="md" colorScheme="blackAlpha">
        <Thead>
          <h3>Faculty Information</h3>
        </Thead>
        <Tbody>
          <Tr>
            <Td>HOUSE NO./ROAD NO.</Td>
            <Td isNumeric>৩,সোবাহান বাগ,মিরপুর রোড,ঢাকা।</Td>
          </Tr>
          <Tr>
            <Td>WARD NO.</Td>
            <Td isNumeric>51</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
