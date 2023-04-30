package com.innershiift.auth.pdfExporter;

import com.innershiift.auth.Module.ModuleAssignment;
import com.innershiift.auth.Module.ModuleResponse;
import com.innershiift.auth.Module.ModuleService;
import com.innershiift.auth.Mood.Mood;
import com.innershiift.auth.Mood.MoodService;
import com.innershiift.auth.user.Patient.Patient;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PdfExporter {

    private final ModuleService moduleService;
    private final MoodService moodService;
    private final Integer pid;

    public PdfExporter(Integer pid, ModuleService moduleService, MoodService moodService) {
        this.pid = pid;
        this.moduleService = moduleService;
        this.moodService = moodService;
    }

    private void writeModuleTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(4);

        com.lowagie.text.Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Scheduled timestamp", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Start timestamp", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Duration (in ms)", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Module Response", font));
        table.addCell(cell);

    }

    private void writeModuleTableData(PdfPTable table) {

        List<ModuleResponse> modules = moduleService.getModulesByPid(pid).orElseThrow(()-> new RuntimeException("error fetching responses"));
        for (ModuleResponse module : modules) {
            table.addCell(module.getModuleAssignment().getScheduled().toString());
            table.addCell(module.getModuleAssignment().getStart_timestamp().toString());
            table.addCell(module.getModuleAssignment().getDuration());
            table.addCell(module.getModuleAssignment().getResponse());
        }
    }


    private void writeMoodTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(2);

        com.lowagie.text.Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Date", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Mood", font));
        table.addCell(cell);

    }

    private void writeMoodTableData(PdfPTable table) {
        ArrayList<String> moodList = new ArrayList<>(){
            {
                add("Energetic");
                add("Happy");
                add("Calm");
                add("Mood swings");
                add("Sad");
                add("Irritated");
            }
        };
        List<Mood> moods = moodService.getMoodByPatientId(pid);
        for (Mood mood : moods) {
            System.out.println("mood: " + mood.getMood() );
            table.addCell(mood.getDate().toString());
            table.addCell(moodList.get(mood.getMood()));
        }
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);

        Paragraph p = new Paragraph("Anonymous Patient Data", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(p);


        Paragraph p3 = new Paragraph("Module Response Data", font);
        p3.setAlignment(Paragraph.ALIGN_LEFT);
        p3.setSpacingBefore(10);
        document.add(p3);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {1.5f, 3.5f, 3.0f, 4.0f});
        table.setSpacingBefore(10);

        writeModuleTableHeader(table);
        writeModuleTableData(table);

        document.add(table);

        Paragraph p2 = new Paragraph("Mood Data", font);
        p2.setAlignment(Paragraph.ALIGN_LEFT);

        document.add(p2);
        PdfPTable moodTable = new PdfPTable(2);
        moodTable.setWidthPercentage(100f);
        moodTable.setWidths(new float[] {3.5f, 3.5f});
        moodTable.setSpacingBefore(10);

        writeMoodTableHeader(moodTable);
        writeMoodTableData(moodTable);

        document.add(moodTable);

        document.close();

    }
}
