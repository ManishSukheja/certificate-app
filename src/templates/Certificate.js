const React = require('react');

function Certificate({ data, Renderer }) {
  const { Document, Page, Text, StyleSheet } = Renderer;

  const styles = StyleSheet.create({
    page: { padding: 40 },
    title: { fontSize: 26, textAlign: 'center', marginBottom: 30 },
    field: { fontSize: 16, marginBottom: 12 },
  });

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(Text, { style: styles.title }, 'Certificate of Registration'),
      React.createElement(Text, { style: styles.field }, `Name: ${data.name}`),
      React.createElement(Text, { style: styles.field }, `Email: ${data.email}`),
      React.createElement(Text, { style: styles.field }, `GST Number: ${data.gstNumber}`),
      React.createElement(Text, { style: styles.field }, `Business Name: ${data.businessName}`),
      React.createElement(Text, { style: styles.field }, `Business Address: ${data.businessAddress}`)
    )
  );
}

module.exports = Certificate;
