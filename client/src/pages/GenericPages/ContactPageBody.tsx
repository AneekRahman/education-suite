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
import MyTexts from "../../components/texts";
import styles from "../../styles/GenericPages/ContactPageBody.module.scss";

export default function ContactPageBody() {
  return (
    <div className={styles.ContactPageBody}>
      <Center>
        <Box bg="#fff" borderRadius={10} className={styles.TableWrapper}>
          <ContactsTable />
        </Box>
      </Center>
    </div>
  );
}

function ContactsTable() {
  return (
    <TableContainer>
      <Table variant="simple" size="md" colorScheme="blackAlpha">
        <TableCaption>
          You can contact us through our email address as well
        </TableCaption>
        <Thead>
          <h3>Contact Infomation</h3>
        </Thead>
        <Tbody>
          <Tr>
            <Td>INSTITUTE NAME: </Td>
            <Td isNumeric>{MyTexts.SITENAME}</Td>
          </Tr>
          <Tr>
            <Td>HOUSE NO./ROAD NO.</Td>
            <Td isNumeric>৩,সোবাহান বাগ,মিরপুর রোড,ঢাকা।</Td>
          </Tr>
          <Tr>
            <Td>WARD NO.</Td>
            <Td isNumeric>51</Td>
          </Tr>
          <Tr>
            <Td>UNION/CITY CORPORATION</Td>
            <Td isNumeric>ঢাকা দক্ষিণ সিটি</Td>
          </Tr>
          <Tr>
            <Td>POST OFFICE</Td>
            <Td isNumeric>মোহাম্মদপুর</Td>
          </Tr>
          <Tr>
            <Td>POST CODE</Td>
            <Td isNumeric>১২০৭</Td>
          </Tr>
          <Tr>
            <Td>POLICE STATION</Td>
            <Td isNumeric>শেরে বাংলা নগর</Td>
          </Tr>
          <Tr>
            <Td>UPAZILLA</Td>
            <Td isNumeric>ঢাকা মহানগরী</Td>
          </Tr>
          <Tr>
            <Td>DISTRICT</Td>
            <Td isNumeric>ঢাকা</Td>
          </Tr>
          <Tr>
            <Td>DIVISION</Td>
            <Td isNumeric>ঢাকা</Td>
          </Tr>
          <Tr>
            <Td>TELEPHONE</Td>
            <Td isNumeric>{MyTexts.CONTACT_PHONE_NUMBER}</Td>
          </Tr>
          <Tr>
            <Td>E-MAIL</Td>
            <Td isNumeric>{MyTexts.CONTACT_EMAIL}</Td>
          </Tr>
          <Tr>
            <Td>WEBSITE</Td>
            <Td isNumeric>{MyTexts.SITE_FULL_LINK}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
