import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import star from "../../Assets/Star-svg.svg";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    paddingLeft: "0",
    height: "4rem",
    width: "90vw",
    marginLeft: "20px",
    borderBottom: "1px solid #E2E2E4",
    gap: "8px",
  },
  textContainerLeft: {
    display:"flex",
    alignItems:"center",
    gap:'8px',
    paddingRight: 1,
  },
  borderSmall: {
    height: "15px",
    width: "1px",
    backgroundColor: "#E2E2E4",
    marginBottom:"5px"
  },
  textLeft: {
    fontSize: 10,
    color: "#000",
  },
  textRight: {
    fontSize: 11,
    color: "#777777",
  },
  icon:{
    width: "10rem",
    height:"10rem"
  }
});

const PDF = ({data}) => {
    console.log(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.textContainerLeft}>
            <Image
              src={`https://res.cloudinary.com/dncjtzg2i/image/upload/v1688146306/xzadik/rpfjtpxk8wykocg5fjim.jpg`}
              style={styles.icon}
            />
            <Text style={styles.textLeft}>Name</Text>
          </View>
          <View style={styles.borderSmall}></View>
          <View style={styles.textContainer}>
            <Text style={styles.textRight}>Faheem</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDF