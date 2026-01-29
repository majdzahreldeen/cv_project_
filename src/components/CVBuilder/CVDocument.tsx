import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CVData } from './types';

// Register a standard font if needed, otherwise use Helvetica (default)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/Roboto-Regular.ttf' });

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#333',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 14,
        marginBottom: 6,
        color: '#555',
    },
    contactInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        fontSize: 10,
        color: '#666',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 8,
        paddingBottom: 2,
        marginTop: 5,
    },
    experienceItem: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    company: {
        fontWeight: 'bold',
    },
    date: {
        color: '#666',
        fontSize: 10,
    },
    jobTitle: {
        fontStyle: 'italic',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
        paddingLeft: 10,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletContent: {
        flex: 1,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillCategory: {
        width: '100%',
        marginBottom: 4,
    },
    skillLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
});

export default function CVDocument({ data }: { data: CVData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo.fullName || 'Your Name'}</Text>
                    <Text style={styles.title}>{data.personalInfo.title}</Text>
                    <View style={styles.contactInfo}>
                        {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
                        {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
                        {data.personalInfo.location && <Text>• {data.personalInfo.location}</Text>}
                        {data.personalInfo.linkedin && <Text>• {data.personalInfo.linkedin}</Text>}
                    </View>
                </View>

                {/* Summary */}
                {data.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text>{data.summary}</Text>
                    </View>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Work Experience</Text>
                        {data.experience.map((exp) => (
                            <View key={exp.id} style={styles.experienceItem}>
                                <View style={styles.row}>
                                    <Text style={styles.company}>{exp.company}</Text>
                                    <Text style={styles.date}>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </Text>
                                </View>
                                <Text style={styles.jobTitle}>{exp.title}</Text>
                                {exp.description && (
                                    <View style={{ marginTop: 4 }}>
                                        {exp.description.split('\n').map((line, i) => (
                                            <View key={i} style={styles.bulletPoint}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.bulletContent}>{line}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu) => (
                            <View key={edu.id} style={{ marginBottom: 6 }}>
                                <View style={styles.row}>
                                    <Text style={{ fontWeight: 'bold' }}>{edu.institution}</Text>
                                    <Text style={styles.date}>{edu.graduationYear}</Text>
                                </View>
                                <Text>{edu.degree}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {(data.skills.hard.length > 0 || data.skills.soft.length > 0) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {data.skills.hard.length > 0 && (
                            <View style={styles.skillCategory}>
                                <Text>
                                    <Text style={styles.skillLabel}>Technical Skills: </Text>
                                    {data.skills.hard.join(', ')}
                                </Text>
                            </View>
                        )}
                        {data.skills.soft.length > 0 && (
                            <View style={styles.skillCategory}>
                                <Text>
                                    <Text style={styles.skillLabel}>Soft Skills: </Text>
                                    {data.skills.soft.join(', ')}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </Page>
        </Document>
    );
}
