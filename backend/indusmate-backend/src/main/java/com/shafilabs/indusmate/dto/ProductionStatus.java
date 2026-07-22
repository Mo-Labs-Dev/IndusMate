package com.shafilabs.indusmate.dto;

public class ProductionStatus {

    private String machineName;
    private String status;
    private int todayCount;
    private int target;
    private double efficiency;

    public ProductionStatus() {
    }

    public ProductionStatus(
            String machineName,
            String status,
            int todayCount,
            int target,
            double efficiency
    ) {
        this.machineName = machineName;
        this.status = status;
        this.todayCount = todayCount;
        this.target = target;
        this.efficiency = efficiency;
    }

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTodayCount() {
        return todayCount;
    }

    public void setTodayCount(int todayCount) {
        this.todayCount = todayCount;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public double getEfficiency() {
        return efficiency;
    }

    public void setEfficiency(double efficiency) {
        this.efficiency = efficiency;
    }
}